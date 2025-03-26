import { defineStore } from 'pinia'

export interface CartItem {
  id: number
  name: string
  price: number
  image: string
  quantity: number
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[],
    isInitialized: false
  }),
  
  getters: {
    itemCount: (state) => {
      return state.items.reduce((count, item) => count + item.quantity, 0)
    },
    
    totalPrice: (state) => {
      return state.items.reduce((total, item) => total + (item.price * item.quantity), 0)
    }
  },
  
  actions: {
    async initializeCart() {
      if (this.isInitialized) return
      
      // First check local storage
      const savedCart = localStorage.getItem('cartItems')
      if (savedCart) {
        this.items = JSON.parse(savedCart)
      }
      
      // If user is logged in, sync with database
      const user = useSupabaseUser()
      if (user.value) {
        await this.syncWithDatabase()
      }
      
      this.isInitialized = true
    },
    
    async addToCart(product: Omit<CartItem, 'quantity'>) {
      // Find if item already exists in cart
      const existingItem = this.items.find(item => item.id === product.id)
      
      if (existingItem) {
        existingItem.quantity++
      } else {
        this.items.push({ ...product, quantity: 1 })
      }
      
      // Save to local storage
      this.saveToLocalStorage()
      
      // If user is logged in, save to database
      const user = useSupabaseUser()
      if (user.value) {
        await this.saveToDatabase()
      }
    },
    
    async removeFromCart(productId: number) {
      this.items = this.items.filter(item => item.id !== productId)
      
      // Save to local storage
      this.saveToLocalStorage()
      
      // If user is logged in, sync with database
      const user = useSupabaseUser()
      if (user.value) {
        await this.saveToDatabase()
      }
    },
    
    async updateQuantity(productId: number, quantity: number) {
      const item = this.items.find(item => item.id === productId)
      
      if (item) {
        item.quantity = quantity
        
        // Remove item if quantity is 0
        if (quantity <= 0) {
          this.removeFromCart(productId)
          return
        }
        
        // Save to local storage
        this.saveToLocalStorage()
        
        // If user is logged in, save to database
        const user = useSupabaseUser()
        if (user.value) {
          await this.saveToDatabase()
        }
      }
    },
    
    saveToLocalStorage() {
      localStorage.setItem('cartItems', JSON.stringify(this.items))
    },
    
    async saveToDatabase() {
      const user = useSupabaseUser()
      const supabase = useSupabaseClient()
      
      if (!user.value) return
      
      // First remove all existing cart items for this user
      await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', user.value.id)
      
      // Then insert the current cart items
      if (this.items.length > 0) {
        const cartItemsForDb = this.items.map(item => ({
          user_id: user.value!.id,
          product_id: item.id,
          quantity: item.quantity,
          added_at: new Date().toISOString()
        }))
        
        await supabase.from('cart_items').insert(cartItemsForDb)
      }
    },
    
    async syncWithDatabase() {
      const user = useSupabaseUser()
      const supabase = useSupabaseClient()
      
      if (!user.value) return
      
      // Get cart items from database
      const { data: cartItems } = await supabase
        .from('cart_items')
        .select('product_id, quantity, products(id, name, price, image_url)')
        .eq('user_id', user.value.id)
      
      if (cartItems && cartItems.length > 0) {
        // Merge local and database carts
        const dbCartItems = cartItems.map(item => ({
          id: item.products.id,
          name: item.products.name,
          price: item.products.price,
          image: item.products.image_url,
          quantity: item.quantity
        }))
        
        // Combine with local items (prefer higher quantity)
        const localCartMap = new Map(this.items.map(item => [item.id, item]))
        const dbCartMap = new Map(dbCartItems.map(item => [item.id, item]))
        
        const mergedItems: CartItem[] = []
        
        // Process all items from both sources
        const allProductIds = new Set([...localCartMap.keys(), ...dbCartMap.keys()])
        allProductIds.forEach(id => {
          const localItem = localCartMap.get(id)
          const dbItem = dbCartMap.get(id)
          
          if (localItem && dbItem) {
            // Both exist, use the one with higher quantity
            mergedItems.push({
              ...localItem,
              quantity: Math.max(localItem.quantity, dbItem.quantity)
            })
          } else if (localItem) {
            mergedItems.push(localItem)
          } else if (dbItem) {
            mergedItems.push(dbItem)
          }
        })
        
        this.items = mergedItems
        this.saveToLocalStorage()
        await this.saveToDatabase() // Sync back to ensure consistency
      }
    },
    
    clearCart() {
      this.items = []
      this.saveToLocalStorage()
      
      // If user is logged in, clear cart in database
      const user = useSupabaseUser()
      if (user.value) {
        this.saveToDatabase()
      }
    }
  }
})
