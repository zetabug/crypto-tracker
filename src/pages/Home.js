import React, { useState, useEffect } from 'react';
import { Box, CircularProgress } from '@mui/material';
import "./home.css";
import Search from '../components/Search';
import ListContainer from '../components/ListContainer';
import PageComponent from '../components/Page';

const Home = () => {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(0)


    async function getData() {
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '0173291af0msh62b3ca25953f210p13d732jsn66b4d9f97708',
                'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
            }
        };
        try {
            const res = await fetch(`https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers%5B0%5D=1&orderBy=marketCap&orderDirection=desc&limit=10&offset=${currentPage * 10}`, options)
            const d = await res.json()
            setCoins(d.data.coins)
            console.log(d.data.coins)

        } catch (error) {
            console.log(error)
        }
    }

    async function searchData() {
        const url = `https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers%5B0%5D=1&orderBy=marketCap&search=${search}&orderDirection=desc&limit=50&offset=0`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '0173291af0msh62b3ca25953f210p13d732jsn66b4d9f97708',
                'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            setCoins(result.data.coins);
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        setLoading(true)
        if(!search){
        getData()
        }else{
            searchData()
        }
        setLoading(false)
    }, [currentPage,search])

    useEffect(() => {

    }, [search])

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '60%', marginInline: 'auto' }}>
            <Search setSearch={setSearch} search={search} />

            {
                loading ?
                    (
                        <Box sx={{ display: 'flex', justifyContent: 'center', height: '100vh', alignItems: 'center' }}>
                            <CircularProgress />
                        </Box>
                    ) :
                    (
                        <>
                            <ListContainer coins={coins} />
                            <PageComponent currentPage={currentPage} setCurrentPage={setCurrentPage} />
                        </>
                    )
            }

        </Box>
    )
}

export default Home
