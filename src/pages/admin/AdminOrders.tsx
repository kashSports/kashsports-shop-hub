import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { supabase } from '@/integrations/supabase/client'
import { useAuth } from '@/hooks/useAuth'
import { useToast } from '@/components/ui/use-toast'

interface AdminOrder {
  id: string
  total: number
  status: 'pending' | 'shipped' | 'delivered'
  shipping_address: string
  created_at: string
  profiles: {
    email: string
  } | null
}

export default function AdminOrders() {
  const { isAdmin } = useAuth()
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ['admin-orders'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          id,
          total,
          status,
          shipping_address,
          created_at,
          user_id
        `)
        .order('created_at', { ascending: false })

      if (error) throw error

      // Get profiles for all orders
      const profileIds = data.map(order => order.user_id)
      const { data: profiles } = await supabase
        .from('profiles')
        .select('user_id, email')
        .in('user_id', profileIds)

      // Merge order data with profile data
      const ordersWithProfiles = data.map(order => ({
        ...order,
        profiles: profiles?.find(p => p.user_id === order.user_id) || null
      }))

      return ordersWithProfiles as AdminOrder[]
    }
  })

  const updateOrderMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', id)

      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-orders'] })
      toast({ title: "Order status updated successfully!" })
    },
    onError: (error) => {
      toast({ 
        title: "Error updating order", 
        description: error.message,
        variant: "destructive" 
      })
    }
  })

  if (!isAdmin) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>
              You don't have permission to access this page.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Order Management</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>All Orders</CardTitle>
          <CardDescription>
            Manage customer orders and update their status
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8">Loading orders...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map(order => (
                  <TableRow key={order.id}>
                    <TableCell className="font-mono text-sm">
                      #{order.id.slice(0, 8)}
                    </TableCell>
                    <TableCell>{order.profiles?.email}</TableCell>
                    <TableCell>
                      {new Date(order.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>${order.total.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge variant={
                        order.status === 'pending' ? 'default' :
                        order.status === 'shipped' ? 'secondary' : 'destructive'
                      }>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={order.status}
                        onValueChange={(status) => 
                          updateOrderMutation.mutate({ id: order.id, status })
                        }
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="shipped">Shipped</SelectItem>
                          <SelectItem value="delivered">Delivered</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}