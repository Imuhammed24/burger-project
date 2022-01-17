import React, {Component} from "react";
import Order from "../../components/Order/Order";
import Spinner from "../../components/UI/Spinner/Spinner";
import {connect} from "react-redux";
import * as actionTypes from '../../actions/index'

class Orders extends Component {
    componentDidMount() {
        this.props.onFetchOrders()
    }

    render() {
        let orders = <Spinner/>
        if (!this.props.loading) {
            orders = (
                <div>
                    {this.props.orders.map(order => (
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

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        error: state.order.error,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: () => dispatch(actionTypes.fetchOrders()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Orders);
