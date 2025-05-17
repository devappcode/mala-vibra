import {CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material';
import bg from './assets/zed-bg.jpeg';
import Scrollbar from "react-scrollbars-custom";
import type { LeagueData } from './models/league-data.ts'
// import data from './data/data.json' with { type: 'json' };
import {useEffect, useState} from "react";

function App() {
    const [data, setData] = useState<LeagueData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    // const rows: LeagueData[] = data

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('https://po6uyzq6ed.execute-api.us-east-2.amazonaws.com/default/Read_OP-GG'); // Replace with your API
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data: LeagueData[] = await response.json();
                setData(data);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                }
                setError('Error');
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    if (loading) return (
        <div className="w-full min-h-screen bg-black flex justify-center">
            <div
                className="w-full max-w-[1594px] min-h-screen bg-cover bg-center bg-no-repeat pt-[30vh] pb-[50px] text-white text-center flex justify-center "
                style={{backgroundImage: `url(${bg})`}}
            >
                <CircularProgress/>
            </div>
        </div>
    );

    if (error) return <div>Error: {error}</div>;


    const headerCellStyle = {backgroundColor: 'black', color: 'white', border: '1px solid #444', textAlign: 'center'};
    const cellStyle = {backgroundColor: 'black', color: 'white', border: '1px solid #444'};
    const tableHeight = '64vh';

    return (
        <div className="w-full min-h-screen bg-black flex justify-center">
            <div
                className="w-full max-w-[1594px] min-h-screen bg-cover bg-center bg-no-repeat pt-[30vh] pb-[50px] text-white text-center flex justify-center "
                style={{backgroundImage: `url(${bg})`}}
            >
                {/*<div className="w-[650px] h-[650px] overflow-auto">*/}
                <Paper sx={{width: '650px', height: tableHeight, overflow: 'hidden'}}>
                    <TableContainer component={Paper} sx={{maxHeight: tableHeight, backgroundColor: 'black'}}>
                        <Scrollbar style={{height: tableHeight}}
                                   trackYProps={{
                                       renderer: props => (
                                           <div
                                               {...props}
                                               ref={props.elementRef}
                                               style={{
                                                   ...props.style,
                                                   backgroundColor: '#000',
                                                   borderRadius: '4px',
                                                   width: '8px',
                                                   right: '2px',
                                               }}
                                           />
                                       )
                                   }}
                                   thumbYProps={{
                                       renderer: props => (
                                           <div
                                               {...props}
                                               ref={props.elementRef}
                                               style={{
                                                   ...props.style,
                                                   backgroundColor: '#3e424b',
                                                   borderRadius: '4px',
                                                   width: '8px',
                                               }}
                                           />
                                       )
                                   }}
                        >
                            <Table stickyHeader aria-label="sticky table" sx={{borderCollapse: "collapse"}}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={headerCellStyle}>Tier</TableCell>
                                        <TableCell sx={headerCellStyle}>Summoner</TableCell>
                                        <TableCell sx={headerCellStyle}>League</TableCell>
                                        <TableCell sx={headerCellStyle}>LP</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {[...data].map((v, i) => (
                                        <TableRow key={i}>
                                            {v.rankLength && (
                                                <TableCell rowSpan={v.rankLength} sx={cellStyle}>{v.rank}</TableCell>
                                            )}
                                            <TableCell sx={cellStyle}>{v.summoner}</TableCell>
                                            <TableCell sx={cellStyle}>{v.tier}</TableCell>
                                            <TableCell sx={cellStyle}>{v.leaguePoints}</TableCell>
                                        </TableRow>
                                   ))}
                               </TableBody>
                           </Table>
                           </Scrollbar>
                       </TableContainer>

                </Paper>
                {/*</div>*/}
            </div>
        </div>
    )
}

export default App
