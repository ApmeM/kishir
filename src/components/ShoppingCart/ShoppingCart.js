import React from "react";
import {connect} from "react-redux";
import {
    contactChanged,
    decreaseCount,
    fetchShoppingCart,
    increaseCount,
    purchase,
    removeProduct,
} from "./ShoppingCartReducer";
import styles from './ShoppingCart.module.css'
import Spinner from "../Spinner/Spinner";
import Error from "../Error/Error";
import {NavLink} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faMinus, faPlus, faTrashAlt} from '@fortawesome/free-solid-svg-icons'
import {compose} from "redux";

class ShoppingCart extends React.Component {
    componentDidMount() {
        this.props.fetchShoppingCart();
    }

    render() {
        if (this.props.isFetching) {
            return <Spinner/>
        }

        if (this.props.failed) {
            return <Error message="Что-то пошло не так. Пожалуйста перезагрузите страницу и попробуйте ее раз."/>
        }

        if (this.props.products.length === 0) {
            if (this.props.showPopup){
                return <div>Спасибо, что разместили заказ<br/>Мы скоро свяжемся с вами.<br/>
                    <NavLink to={'/'}>Вернуться к магазину.</NavLink>
                </div>
            }
            return <Error message="Ваша корзина пуста."/>
        }

        // ToDo: move calculations to somewhere else
        let productsTotal = this.props.products.reduce((acc, value) => acc + value.count * value.price, 0);

        return <div className={styles.news}>
            <table className={styles.cartTable}>
                <thead>
                <tr>
                    <td>Продукт</td>
                    <td>Количество</td>
                    <td></td>
                    <td className={styles.cartPrice}>Стоимость</td>
                </tr>
                </thead>
                <tbody>

                {this.props.products.map((p) => {
                    return <tr key={p.id}>
                        <td className={styles.table_td}>
                            <NavLink to={`/product/${p.id}`}>
                                <img className={styles.productThumbnail} src={p.thumbnail} alt='thumbnail'/>
                                <div className={styles.productName}>{p.type} {p.name} {p.variant}</div>
                            </NavLink>
                            <div className={styles.productPrice}>
                                <div>{p.price}</div>
                                {p.currency}</div>
                            <div dangerouslySetInnerHTML={{__html: p.description}}
                                 className={styles.productDescription}></div>
                        </td>
                        <td>
                            <button onClick={() => this.props.decreaseCount(p.id, p.id)} title="Убавить">
                                <FontAwesomeIcon icon={faMinus}/></button>
                            {p.count}
                            <button onClick={() => this.props.increaseCount(p.id, p.id)} title="Добавить">
                                <FontAwesomeIcon icon={faPlus}/></button>
                        </td>
                        <td>   <button onClick={() => this.props.removeProduct(p.id, p.id)} title="Удалить"
                                       className={styles.cartDelete}>
                            <FontAwesomeIcon icon={faTrashAlt}/>
                        </button>
                        </td>
                        <td className={styles.cartPrice}>
                            <span>{p.count * p.price}</span> {p.currency}
                        </td>
                    </tr>
                })}
                <tr>
                    <td colSpan="4" className={styles.cartPriceTotal}>
                        Общая сумма : <span>{productsTotal}</span> руб.
                    </td>
                </tr>
                </tbody>
                <tfoot>
                <tr>
                    <td colSpan="4" >
                        <div><p><span>Контактная информация(e-mail или номер телефона): </span>
                        <input onChange={(e) => this.props.contactChanged(e.target.value)} value={this.props.contact}/>
                        {this.props.purchaseProcessing ? <Spinner/> : null}
                        <br/><i>Поле Контактная информация обязательно для заполнения</i></p>
                        </div>
                        <div>
                            <button disabled={this.props.purchaseProcessing || !this.props.contact}
                                onClick={() => this.props.purchase(this.props.contact, this.props.products)}
                                className={styles.buttonPurchase}>Оформить
                            </button>
                        </div>
                    </td>
                </tr>
                </tfoot>
            </table>
        </div>
    }
}

const mapStateToProps = state => state.shoppingCart;
export default compose(
    connect(mapStateToProps, {
        increaseCount,
        decreaseCount,
        removeProduct,
        fetchShoppingCart,
        purchase,
        contactChanged
    })
)(ShoppingCart)
