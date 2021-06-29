import Vue from 'vue'
import { Button,
        Container,
        Header,
        Main,
        Footer,
        Carousel,
        CarouselItem,
        Row,
        Col,
        Slider,
        Card,
        Notification,
        Message,
        MessageBox,
        Table,
        TableColumn,
        Loading,
        Pagination,
        Input,
        Dropdown,
        DropdownItem,
        DropdownMenu
        } from 'element-ui'

Vue.use(Button)
Vue.use(Container)
Vue.use(Header)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Row)
Vue.use(Col)
Vue.use(Slider)
Vue.use(Card)
Vue.use(Notification)
Vue.use(Message)
Vue.use(MessageBox)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Loading)
Vue.use(Pagination)
Vue.use(Input)
Vue.use(Dropdown)
Vue.use(DropdownItem)
Vue.use(DropdownMenu)
Vue.prototype.$message = Message
Vue.prototype.$comfirm = MessageBox.confirm
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$loading = Loading
