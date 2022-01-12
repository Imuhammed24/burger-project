import React, {Component} from "react";
import Order from "../../components/Order/Order";
import axios from "axios";
import Spinner from "../../components/UI/Spinner/Spinner";

class Orders extends Component {
    state = {
        orders: [],
        loading: true,
        error: true,
    }

    componentDidMount() {
        axios.get('/orders.json').then(response => {
            if (response.data) {
                const fetchedOrders = [];
                for (let key in response.data) {
                    fetchedOrders.push({
                        ...response.data[key],
                        key: key
                    });
                }
                this.setState({
                    orders: fetchedOrders,
                    loading: false,
                })
            }
        }).catch(error => {
            this.setState({
                error: true,
            })
            console.log(error)
        })
    }

    render() {
        let orders = <Spinner/>
        if (!this.state.loading) {
            orders = (
                <div>
                    {this.state.orders.map(order => (
                        <Order
                            key={order.key}
                            ingredients={order.ingredients}
                            price={order.orderTotal}
                        />))}
                </div>
            )
        }
        return orders
    }
}

export default Orders;