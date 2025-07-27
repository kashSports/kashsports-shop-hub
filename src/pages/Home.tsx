import { Link } from 'react-router-dom'
import { ArrowRight, Star, Truck, Shield, Headphones } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function Home() {
  const featuredCategories = [
    {
      name: 'Cricket',
      image: 'https://res.cloudinary.com/dmubonvht/image/upload/v1753535465/qj3t4tzg3kjw6usb5alo.webp',
      description: 'Premium cricket gear including bats, balls, gloves, and protective equipment for all levels.'
    },
    {
      name: 'Soccer',
      image: 'https://res.cloudinary.com/dmubonvht/image/upload/v1753535929/z8fguraktdekamo6bybr.webp',
      description: 'Top-quality soccer balls, shoes, jerseys, and accessories for players and fans.'
    },
    {
      name: 'Fitness',
      image: 'https://res.cloudinary.com/dmubonvht/image/upload/v1753533611/defof9dypl4us8ijkshi.jpg',
      description: 'Essential fitness equipment and accessories to support your training and healthy lifestyle.'
    }
  ]

  const features = [
    {
      icon: Truck,
      title: 'Free Shipping',
      description: 'Free delivery on orders over ₹1200'
    },
    {
      icon: Shield,
      title: 'Quality Guarantee',
      description: '100% authentic sports accessories'
    },
    {
      icon: Headphones,
      title: 'Customer Support',
      description: 'Customer support when you need it'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary to-secondary text-primary-foreground py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1500&q=80')] bg-cover bg-center opacity-20 pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-lg">
              Premium Sports Accessories
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-95 font-medium drop-shadow">
              Elevate your game with <span className="text-secondary font-bold">KashSports</span> – Your destination for professional-grade sports equipment
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="shadow-xl px-8 py-6 text-lg font-semibold">
                <Link to="/products" className="flex items-center gap-2">
                  Shop Now <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="shadow-xl px-8 py-6 text-lg font-semibold border-2 border-secondary/80 hover:bg-secondary/90 hover:text-white transition-all"
              >
                <Link to="/categories" className="flex items-center gap-2 font-semibold tracking-wide">
                  <span className="inline-block">Browse Categories</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      

      {/* Featured Categories */}
      <section className="py-20 bg-gradient-to-b from-muted/40 to-transparent">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-primary">Featured Categories</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover our most popular sports accessories categories
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {featuredCategories.map((category) => (
              <Card
                key={category.name}
                className="overflow-hidden group shadow-md hover:shadow-2xl transition-all border-0 bg-white/90 hover:bg-white"
              >
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-70 group-hover:opacity-60 transition-opacity" />
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-2xl font-bold text-primary group-hover:text-secondary transition-colors">
                    {category.name}
                  </CardTitle>
                  <CardDescription className="text-base text-muted-foreground group-hover:text-primary">
                    {category.description}
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button asChild className="w-full rounded-full font-semibold tracking-wide group-hover:bg-secondary group-hover:text-primary transition-all">
                    <Link to={`/products?category=${category.name.toLowerCase().replace(' ', '-')}`}>
                      View Products
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">10K+</div>
              <div className="text-sm opacity-90">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">500+</div>
              <div className="text-sm opacity-90">Products</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">50+</div>
              <div className="text-sm opacity-90">Brands</div>
            </div>
            <div>
              <div className="flex items-center justify-center gap-1 mb-2">
                <span className="text-3xl md:text-4xl font-bold">4.9</span>
                <Star className="h-6 w-6 fill-current" />
              </div>
              <div className="text-sm opacity-90">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 md:p-12 text-center text-primary-foreground">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Elevate Your Game?
            </h2>
            <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
              Join thousands of athletes who trust KashSports for their training and competition needs
            </p>
            <Button asChild size="lg" variant="secondary">
              <Link to="/products" className="flex items-center gap-2">
                Start Shopping <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}