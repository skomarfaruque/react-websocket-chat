import React from 'react';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Sidebar, SidebarItem } from 'react-responsive-sidebar';
import { Badge, Button, InputNumber, Tag, Checkbox, Radio, Notification, MessageBox } from 'element-react';
import { connect } from 'react-redux';
import ReactDrawer from 'react-drawer';
import 'react-drawer/lib/react-drawer.css';
import FaBeer from 'react-icons/lib/fa/align-justify'
import Cart from 'react-icons/lib/fa/shopping-cart'
import * as FontAwesome from 'react-icons/lib/fa'
class Layout extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      optionsdata: [],
      open: false,
      position: 'left',
      noOverlay: false,
      showModal: false,
      num6: 1,
      grandTotalPrice: 0,
      updateModal: false,
      activeCartItem: {},
      activeTempProduct: this.props.cartItem.tempProduct,
      totalPrice: 0,
      isFull: true
    };
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.closeDrawer = this.closeDrawer.bind(this);
    this.onDrawerClose = this.onDrawerClose.bind(this);
    this.setPosition = this.setPosition.bind(this);
    this.setNoOverlay = this.setNoOverlay.bind(this);
  }
  componentWillMount() {
    document.documentElement.webkitRequestFullscreen()

  }
  async componentDidMount() {
    await this.upateGrandTotalPrice()
    if (!document.fullscreenElement) {
      document.documentElement.webkitRequestFullscreen()
    }
  }
  componentDidUpdate() {
    if (!document.fullscreenElement) {
      document.documentElement.webkitRequestFullscreen()
    }
  }
  setPosition(e) {
    this.setState({ position: e.target.value });
  }
  setNoOverlay(e) {
    this.setState({ noOverlay: e.target.checked });
  }
  toggleDrawer() {
    this.setState({ open: !this.state.open });
  }
  closeDrawer() {
    this.setState({ open: false });
  }
  onDrawerClose() {
    this.setState({ open: false });
  }
  demoFunction(e) {
    console.log(this.props)
  }
  async deleteItemFromCart(key) {
    MessageBox.confirm('Would you like to Continue?', 'Confirmation', {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'error'
    }).then(async () => {
      await this.props.cart(key)
      await this.upateGrandTotalPrice()
      this.successNotification("Removed from cart")
    }).catch(() => {
    });
  }
  clearAll() {
    MessageBox.confirm('Would you like to Continue?', 'Confirmation', {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'error'
    }).then(async () => {
      await this.props.removeAll()
      this.successNotification("Removed from cart")
      this.setState({ showModal: false })
    }).catch(() => {
    });
  }
  async enableUPdateScreen(key) {
    await this.setState(
      {
        showModal: false,
        updateModal: true,
        activeCartItem: this.props.cartItem.cartItems[key],
        activeTempProduct: this.props.cartItem.cartItems[key].tempProduct,
        totalPrice: this.props.cartItem.cartItems[key].totalPrice,
        key
      })
    let objArr = []
    let obj = this.state.activeCartItem
    for (var key in obj) { // loop the json object
      if (obj.hasOwnProperty(key)) {
        if (key !== 'totalPrice' && key !== 'tempProduct' && key !== 'allconfig' && key !== 'quantity') {
          let dummyInfo = { key, info: [], array: true }
          if (Array.isArray(obj[key])) {
            obj[key].map(dt => {
              dummyInfo.info.push({ configId: (dt).toString() })
            })
          } else {
            dummyInfo.array = false
            dummyInfo.info.push({ configId: (obj[key]).toString() })
          }
          objArr.push(dummyInfo)
        }
      }
    }
    await this.state.activeTempProduct.ProductDetails.map(async (data) => {
      let foundAdon = await objArr.find(d => {
        return d.key === data.ConfigurationName
      })
      console.log('foundadon', foundAdon)
      if (foundAdon.key === data.ConfigurationName) {
        if (foundAdon.array) {
          let selectedAdonsArrayType = []
          await foundAdon.info.map(adt => {
            if (adt.configId) {
              selectedAdonsArrayType.push(adt.configId)
            }

          })
          await this.setState({ [data.ConfigurationName]: selectedAdonsArrayType })
        } else {
          await this.setState({ [data.ConfigurationName]: foundAdon.info[0].configId || '' })
        }
      }
    })
  }
  async onChange(key, value) {
    if (typeof value === 'number') {
      value = Math.floor(value)
    } else {
      console.log(value)
      value = this.props.cartItem.cartItems[key].quantity
    }
    let obj = { key, value }
    await this.props.updateQuantity(obj)
    await this.upateGrandTotalPrice()
  }
  async upateGrandTotalPrice() {
    let grandTotalPrice = 0
    let grandTotal = await this.props.cartItem.cartItems.map(p => {
      grandTotalPrice += p.quantity * p.totalPrice
    })
    this.setState({ grandTotalPrice })
  }
  async onChangeUpdate(key, value) {
    await this.setState({
      [key]: value
    })
    await this.priceCalculation()
  }
  async priceCalculation() {
    let objArr = []
    let obj = this.state
    for (var key in obj) { // loop the json object
      if (obj.hasOwnProperty(key)) {
        if (key !== 'totalPrice' && key !== 'tempProduct' && key !== 'allconfig' && key !== 'quantity') {
          if (Array.isArray(obj[key])) {
            obj[key].map(dt => {
              objArr.push({ configId: (dt).toString() })
            })
          } else {
            objArr.push({ configId: (obj[key]).toString() })
          }
        }
      }
    }

    let price = []
    await objArr.map(async oData => {
      let conPrice = await this.state.activeCartItem.allconfig.find(allData => {
        return allData.id === oData.configId
      })
      await price.push(conPrice)
    })
    let finalCalPrice = this.state.activeCartItem.tempProduct.Price
    await price.map(pCal => {
      if (pCal) {
        finalCalPrice += pCal.adons.Price
      }
    })
    this.setState({ totalPrice: finalCalPrice })

  }
  async updateCartItem() {
    let d = { hello: 12 }
    // let activeCart = await Object.assign({},this.state.activeCartItem) 
    let finalIteration = await Object.assign({}, this.state.activeCartItem, this.state)
    delete finalIteration.activeCartItem
    delete finalIteration.activeTempProduct
    delete finalIteration.grandTotalPrice
    delete finalIteration.noOverlay
    delete finalIteration.num6
    delete finalIteration.open
    delete finalIteration.optionsdata
    delete finalIteration.position
    delete finalIteration.showModal
    delete finalIteration.updateModal
    delete finalIteration.key
    let ind = { finalIteration, arrayInd: this.state.key }
    await this.props.updateCartItems(ind)
    await this.upateGrandTotalPrice()
    this.successNotification("Update success")
    await this.setState({ updateModal: false, showModal: true })
  }
  async showCartModal() {
    if (this.props.cartItem.cartItems.length) {
      await this.setState({ showModal: true })
      await this.upateGrandTotalPrice()
    }
  }
  successNotification(msg) {
    Notification({
      title: 'Success',
      message: msg,
      type: 'success'
    })
  }
  render() {
    return
  }
}
const mapStateToProps = state => ({
  isLoggedIn: state.auth.token,
  cartItem: state.cart
})
const mapDispatchToProps = dispatch => ({
  cart: (index) => dispatch({ type: 'removeCartItems', index }),
  removeAll: (index) => dispatch({ type: 'removeAll', index }),
  updateQuantity: (index) => dispatch({ type: 'updateQuantity', index }),
  updateCartItems: (index) => dispatch({ type: 'updateCartItems', index })
})
export default connect(mapStateToProps, mapDispatchToProps)(Layout);
// export default Layout;