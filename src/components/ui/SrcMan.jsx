
import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Spin, Select, Button, Table, Tabs, message } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import LocalizedModal from '../ui/Modals';
import { CONFIRM_JUMP, CONFIRM_DELETE } from '../../constants/common';
import { fetchApi } from '../../callApi';
import { ADMIN_nav_list, getNavAllArticle } from '../../constants/api/navi';
import { removeArticle, deleteArticle } from '../../constants/api/source';
import { getCateLists } from '../../constants/api/category';
import postcssFlexbugsFixes from 'postcss-flexbugs-fixes';

import './banners/Src.scss';

const { TabPane } = Tabs;
const { Option, OptGroup } = Select;
const success = (content) => {
    message.success(content);
};
const error = (content) => {
    message.error(content);
}

const setting = {
    method: "GET",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    mode: "cors",
    cache: "default",
};


class Src extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nav_id: 87,
            show: null,
            pageNum: 1,
            pageSize: 10,
            accdat: [],
            isFinished: 0,
            traTo: null,
            f5: 0,
            value: [],
            selectVal: null,
            isdel: `none`,
            ismov: `none`,
        };
        this.handleClick = this.handleClick.bind(this);
    }

    componentWillMount() {
        fetch(`http://120.48.17.78:8080/api/Article/getByPage?nav_id=` + this.state.nav_id + `&pageNum=` + this.state.pageNum + `&pageSize=` + this.state.pageSize, setting)
            .then(function (response) {
                return response.json();
            })
            .then((res) => {
                console.log("@")
                // console.log(res)
                this.setState({
                    accdat: res.data.res,
                    isFinished: 1,
                },
                    () => {
                        console.log(this.state.accdat)
                        console.log(this.state.accdat[0])

                    })
            })
    }

    handleClick = (id, num) => {
        if (id !== -1) {
            this.setState({
                nav_id: id,
                pageNum: 1,
            });
            num = 1;
        }

        fetch(`http://120.48.17.78:8080/api/Article/getByPage?nav_id=` + id + `&pageNum=` + num + `&pageSize=` + this.state.pageSize, setting)
            .then(function (response) {
                return response.json();
            })
            .then((res) => {
                console.log("@")
                // console.log(res)
                this.setState({
                    accdat: res.data.res,
                    isFinished: 1,
                },
                    () => {
                        console.log(this.state.accdat)
                        console.log(this.state.accdat[0])

                    })
            })

    }


    edit = (index) => {


    }


    pagechange = (x) => {
        console.log("past: " + this.state.pageNum)

        if (x === -1) {
            if (this.state.pageNum > 1)
                this.setState({
                    pageNum: --this.state.pageNum,
                })
        }

        else {
            this.setState({
                pageNum: ++this.state.pageNum,
            })
        }

        console.log(this.state.pageNum)

        fetch(`http://120.48.17.78:8080/api/Article/getByPage?nav_id=` + this.state.nav_id + `&pageNum=` + this.state.pageNum + `&pageSize=` + this.state.pageSize, setting)
            .then(function (response) {
                return response.json();
            })
            .then((res) => {
                console.log("@")
                // console.log(res)
                this.setState({
                    accdat: res.data.res,
                    isFinished: 1,
                })
            })
    }

    show = () => {

        if (this.state.isFinished) {
            return this.state.accdat.map((item, index) => {
                let path = {
                    pathname: `/app/edit/activity`,
                    state: item.id,
                }
                return (
                    <div style={{ display: `flex`, justifyContent: `space-between`, margin: `10px`, }}>
                        <div style={{ display: `flex`, justifyContent: `space-between` }}>

                            <div style={{ height: `20px`, margin: `5px`, }}>
                                <br></br>
                                <input type="checkbox" className='checkbox' value={index} name="message" onChange={this.getInp} />
                            </div>

                            <div>
                                <h3 className='inP'></h3>
                                <h3>{index + 1}&emsp;{item.title}</h3>
                                <h4>????????????:{item.updated_at}</h4>
                            </div>
                        </div>

                        <div>
                            {/* <button className='operateButEdit' onClick={({ index }) => this.edit(index)}>??????</button> */}
                            <Link to={path} className='operateButEdit'><Button type="default">??????2</Button></Link>
                        </div>


                    </div>
                )
            })
        }
    }

    getInp = (event) => {
        let item = event.target.value;
        // ...????????????????????????????????????????????????????????????????????????????????????
        let items = [...this.state.value];
        console.log(items)
        // ????????????a
        let index = items.indexOf(item);
        // ??????????????????????????????????????????
        {
            index === -1 ? items.push(item) : items.splice(index, 1)
        }
        // ??????????????????
        console.log("before")
        console.log(items)
        console.log(this.state.value)
        this.setState({
            value: items
        });
        console.log("after")
        console.log(items)
        console.log(this.state.value)
    }

    del1 = () => {
        this.setState({
            isdel: `block`,
            ismov: `none`
        })
    }

    del3 = () => {
        this.setState({
            isdel: `none`
        })
    }

    del2 = () => {

        this.setState({
            isdel: `none`,
        });

        let lis = this.state.value;
        let url = `http://120.48.17.78:8080/api/Article/multiDelete?deleteList=` + lis;

        fetch(url, {
            method: "POST",
        }).then(
            this.setState({
                f5: this.state.f5++,
            })
        );



    }

    handleSelectChange(e) {
        let val = e.target.value
        this.setState({
            selectVal: val
        });

    }

    changeSel = () => {
        let sel = this.state.selectVal;
        let lis = this.state.value;
        let url = `http://120.48.17.78:8080/api/Article/updateArticleNav?nav_id=` + sel + `&updataList=` + lis
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        }).then(
            this.setState({
                f5: this.state.f5++,
            })
        )
    }

    mov = () => {
        this.setState({
            ismov: `none`,
        })
    }

    changeSel1 = () => {
        this.setState({
            ismov: `block`,
            isdel: `none`
        })
    }

    pageNumx = () => {
        return this.state.pageNum
    }

    render() {

        return (
            <div >
                <BreadcrumbCustom first="????????????" />
                <div id="root444">

                    <div id="left">
                        <div>
                            <div id="sad">
                                <button onClick={() => this.handleClick(87)} className="meau">????????????</button>
                            </div>
                            <div>
                                <button onClick={() => this.handleClick(86)} className="meau">????????????</button>
                            </div>
                            <div>
                                <button onClick={() => this.handleClick(89)} className="meau">????????????</button>
                            </div>
                            <div>
                                <button onClick={() => this.handleClick(83)} className="meau">????????????</button>
                            </div>
                            <div>
                                <button onClick={() => this.handleClick(84)} className="meau">????????????</button>
                            </div>
                            <div>
                                <button onClick={() => this.handleClick(85)} className="meau">????????????</button>
                            </div>
                            <div>
                                <button onClick={() => this.handleClick(69)} className="meau">????????????</button>
                            </div>
                        </div>

                        <div id="operate">

                            <div className='operateBox'>
                                <button className='operateBut' style={{ display: `inline` }} onClick={() => this.pagechange(-1)}>?????????</button>
                                <h3>{this.state.pageNum}</h3>
                                <button className='operateBut' onClick={() => this.pagechange(1)}>?????????</button>
                            </div>

                            <div className='operateBox'>
                                <button className='operateBut' onClick={this.changeSel1}>?????????</button>
                                <button className='operateBut' id="del" onClick={this.del1}>???&emsp;???</button>
                            </div>


                            <div style={{ display: this.state.isdel }} className='operateBox'>
                                <h4>????????????</h4>
                                <button onClick={this.del2} className='operateBut' id="del2">??????</button>
                                <button onClick={this.del3} className='operateBut'>??????</button>
                            </div>

                            <div className='operateBox' style={{ display: this.state.ismov }}>
                                <h3>?????????</h3>
                                <select className='dropdown' onChange={this.handleSelectChange.bind(this)}>
                                    <option value={86} onChange>????????????</option>
                                    <option value={87}>????????????</option>
                                    <option value={89}>????????????</option>
                                    <option value={83}>????????????</option>
                                    <option value={84}>????????????</option>
                                    <option value={85}>????????????</option>
                                </select>
                                <button onClick={this.changeSel} className="operateBut red">????????????</button>
                                <button onClick={this.mov} className="operateBut">??????</button>
                            </div>

                        </div>
                    </div>



                    <div id="showinf2">
                        <div>
                            {this.show()}
                        </div>
                    </div>


                </div>

            </div >
        )
    }
}

export default Src;