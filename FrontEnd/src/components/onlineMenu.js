import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { RightTabLogin } from "./rightTabLogin";
import { MenuCard } from "./card";
import "../style/cart.css";
import Cart from "./cart";
import { useState, useMemo } from "react";
import { debounce } from "lodash";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setMenu } from "./menu";
import Loading from "./Loading";


async function fetchMenu() {
   try {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/getMenu`);
    return response.data.menu;
    } catch (error) {
        console.error('Error fetching menu:', error);
        return {}
    }
   
}

function LoadMenuFromServer(){
    const dispatch = useDispatch(); 
    const isInitialized = useSelector((state) => state.menu.isInitialized);
    useEffect(() => {
      if(!isInitialized){
        fetchMenu().then(menu => {
          dispatch(setMenu(menu));
        });
      }
    }, [dispatch, isInitialized]);
  
    return isInitialized;
  }

function SearchList({searchResult}) {
    return (
        <section id="searchResult">
            {searchResult.map((item) => (
                <MenuCard key={item.itemName} item={item} />
            ))}
        </section>
    );
}


function OrderOnline() {
    const isInitialized = LoadMenuFromServer();
    
    const menu = useSelector((state) => state.menu.menu);
    const [item, setItem] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    
    const searchMenu = useMemo(
        () => debounce((searchTerm) => {
            if(searchTerm.trim() === "") {
                setSearchResult([]);
                return;
            }
            const itemNames = Object.keys(menu);
            const searchMenuList = [];
            itemNames.forEach(name => {
                if(name.toLowerCase().includes(searchTerm.toLowerCase())) {
                    searchMenuList.push(menu[name]);
                }
            });
            setSearchResult(searchMenuList);
        }, 500),
        [menu]
    );

    if (!isInitialized) {
        return <Loading />;
    }

    const handleChange = (e) => {
        const value = e.target.value;
        setItem(value);
        searchMenu(value);
    }
    return (
        <React.Fragment>
        <section id="onlineOrder">
            <RightTabLogin />
            <section id="onlineMenu">
                <section id="searchBar">
                    <input type="text" placeholder="Search for a item" value={item}  onChange={handleChange} />
                </section>
                {searchResult.length === 0 &&<section id="menu ">
                    <section id="beverages">
                        <header>
                            <h1>Beverages</h1>
                        </header>
                        <section id="beverageList">
                                <MenuCard item={menu.tea} />
                                <MenuCard item={menu.coffee} />
                        </section>
                    </section>
                    <section id="snacks">
                        <header>
                            <h1>Snacks</h1>
                        </header>
                        <section id="snacksList">
                            <MenuCard item={menu.elanji} />
                            <MenuCard item={menu.kaypola} />
                            <MenuCard item={menu.ullivada} />
                        </section>
                    </section>
                    <section id="desserts">
                        <header> 
                            <h1>Desserts</h1>
                        </header>
                        <section id="dessertsList">
                            <MenuCard item={menu.tenderCoconut} />
                            <MenuCard item={menu.bananaHalwa} />
                        </section>
                    </section>
                </section>}
                {searchResult.length > 0 && <SearchList searchResult={searchResult} />}
            </section>
            <Cart />
        </section>
        </React.Fragment>
    );
  }
export { OrderOnline , fetchMenu }; 