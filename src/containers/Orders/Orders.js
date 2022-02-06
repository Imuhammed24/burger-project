import React, {Component} from "react";
import Order from "../../components/Order/Order";
import Spinner from "../../components/UI/Spinner/Spinner";
import {connect} from "react-redux";
import * as actionTypes from '../../store/actions/'

class Orders extends Component {
    componentDidMount() {
        this.props.onFetchOrders(this.props.token, this.props.userId)
    }

    render() {
        let orders = <Spinner/>
        if (!this.props.loading) {
            orders = (
                <div>
                    {this.props.orders.length > 0 ?
                        this.props.orders.map(order => (
                            <Order
                                key={order.key}
                                ingredients={order.ingredients}
                                price={order.orderTotal}
                            />)) :
                        <h2 style={{padding: '30px'}}>No Order Added</h2>}
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
        token: state.auth.token,
        userId: state.auth.userId,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token, userId) => dispatch(actionTypes.fetchOrders(token, userId)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Orders);
