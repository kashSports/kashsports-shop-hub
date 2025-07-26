import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { supabase } from '@/lib/supabase'

export default function Categories() {
  const { data: categoriesData = [], isLoading } = useQuery({
    queryKey: ['categories-with-counts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('category')
        
      if (error) throw error
      
      // Count products per category
      const categoryCount = data.reduce((acc, product) => {
        if (product.category) {
          acc[product.category] = (acc[product.category] || 0) + 1
        }
        return acc
      }, {} as Record<string, number>)
      
      return Object.entries(categoryCount).map(([category, count]) => ({
        name: category,
        count,
        slug: category.toLowerCase().replace(/\s+/g, '-')
      }))
    }
  })

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-6 bg-muted rounded"></div>
                <div className="h-4 bg-muted rounded w-3/4"></div>
              </CardHeader>
              <CardContent>
                <div className="h-4 bg-muted rounded w-1/2"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Product Categories</h1>
        <p className="text-muted-foreground">
          Browse our sports products by category
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoriesData.map(category => (
          <Link 
            key={category.name} 
            to={`/products?category=${category.slug}`}
            className="block group"
          >
            <Card className="hover:shadow-lg transition-shadow group-hover:border-primary/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {category.name}
                  </CardTitle>
                  <Badge variant="secondary">
                    {category.count} {category.count === 1 ? 'product' : 'products'}
                  </Badge>
                </div>
                <CardDescription>
                  Explore our {category.name.toLowerCase()} collection
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Click to view all {category.name.toLowerCase()} products
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {categoriesData.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">No categories found.</p>
        </div>
      )}
    </div>
  )
}