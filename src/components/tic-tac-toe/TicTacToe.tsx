import { Box, Button, Grid, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { colorPallete } from '../../assets';
import tictactoeImg from '../../assets/img/tictactoe.png'
import PlayBox from '../play-box';
import Point from '../point';
import { Theme } from "@mui/material/styles"
import NoticeBoard from '../notice-board';
import { IWinner } from '../../interfaces';
import WinningBoard from '../winning-board';

const styles = {
    gameBox: (theme: Theme) => ({
        backgroundColor: colorPallete.secondary,
        padding: theme.spacing(3),
        borderRadius: theme.shape.borderRadius,
        maxWidth: '90%',
        margin: 'auto',
        height: 'auto',
        [theme.breakpoints.up('md')]: {
            padding: theme.spacing(5),
            maxWidth: 300,
            height: '60%',
        },
        [theme.breakpoints.between('xs', 'md')]: {
            padding: theme.spacing(5),
            maxWidth: 300,
            height: 'auto',
        }
    }),
    btnNewGame: (theme: Theme) => ({
        color: theme.palette.common.black,
        backgroundColor: theme.palette.common.white,
        width: '100%',
        '&:hover': {
            backgroundColor: colorPallete.secondary_blue,
            border: `1px solid ${colorPallete.primary_blue}`
        }
    }),
    attentionArea: {
        paddingTop: 2
    }
}

const TicTacToe = () => {
    const [cells, setCells] = useState<string[]>(Array(9).fill(''));
    const [isXNext, setIsXNext] = useState<boolean>(true);
    const [player, setPlayer] = useState<string>('X')
    const [playing, setPlaying] = useState<boolean>(false)
    const [xwinner, setXWinner] = useState<IWinner>({ name: '', point: 0 })
    const [owinner, setOWinner] = useState<IWinner>({ name: '', point: 0 })
    const [draw, setDraw] = useState<IWinner>({ name: '', point: 0 })
    const [count, setCount] = useState<number>(0)
    const winningCombinations: number[][] = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]

    const checkWinner = (board: string[]) => {
        for (const [a, b, c] of winningCombinations) {
            if (board[a] && board[a] === board[b] && board[b] === board[c]) {
                return board[a];
            }
        }
        return null;
    }

    const onClickCheck = (index: number) => () => {
        if (cells[index] !== '') return;
        const newCells = cells.slice();
        newCells[index] = isXNext ? 'X' : 'O';
        const thePlayer = newCells[index] === 'X' ? 'O' : 'X';
        setPlayer(thePlayer);
        setCells(newCells);
        setIsXNext(!isXNext);
    };


    useEffect(() => {
        const xresult: number[] = [];
        const oresult: number[] = [];
        cells.map((item, index) => {
            if (item === 'X') xresult.push(index)
            if (item === 'O') oresult.push(index)
        })
        const result = checkWinner(cells)
        setCount(count + 1)
        if (result === 'X') {
            setXWinner({ name: 'X', point: xwinner.point + 1 })
            setPlaying(false)
        }
        if (result === 'O') {
            setOWinner({ name: 'O', point: owinner.point + 1 })
            setPlaying(false)
        }
        console.log(count)
        if (count === 9 && result !== 'X' && result !== 'O') {
            setDraw({ name: 'draw', point: draw.point + 1 })
            setPlaying(false)
        }
    }, [cells])

    const onClickNewGame = () => {
        setCells(Array(9).fill(''))
        setPlaying(true)
        setCount(0)
        setXWinner(prev => ({ ...prev, name: '' }))
        setOWinner(prev => ({ ...prev, name: '' }))
        setDraw(prev => ({ ...prev, name: '' }))
    }

    return (
        <Stack sx={{ height: '100vh', backgroundColor: colorPallete.primary }}>
            <Box sx={styles.gameBox}>
                <Grid container justifyContent='center'>
                    <Point label='PLAYER X' point={xwinner.point} bgColor={colorPallete.primary_blue} />
                    <Point label='DRAWER' point={draw.point} bgColor={colorPallete.secondary_blue} />
                    <Point label='PLAYER O' point={owinner.point} bgColor={colorPallete.primary_yellow} />
                </Grid>
                <Grid container justifyContent="center" sx={{
                    pointerEvent: 'none'
                }}>
                    {cells.map((cell, index) => (
                        <PlayBox key={index} check={cell} onClickPlay={onClickCheck(index)} playing={playing} />
                    ))}
                </Grid>
                {playing && <Grid container justifyContent="center">
                    <NoticeBoard player={player} />
                </Grid>}
                <Stack sx={styles.attentionArea}>
                    {xwinner.name !== '' && <Grid container justifyContent="center"><WinningBoard label='Game Over. Player X Wins!' /></Grid>}
                    {owinner.name !== '' && <Grid container justifyContent="center"><WinningBoard label='Game Over. Player O Wins!' /></Grid>}
                    {draw.name !== '' && <Grid container justifyContent="center"><WinningBoard label='Game Over. Its a Draw' /></Grid>}
                    {!playing && <Grid container justifyContent="center" paddingTop={0}>
                        <Button sx={styles.btnNewGame} onClick={onClickNewGame}>New Game</Button>
                    </Grid>}
                </Stack>

            </Box>
            <img alt='tic-tac-toe' src={tictactoeImg} style={{ width: '20%', position: 'fixed', bottom: 0 }} />
        </Stack>

    )
}

export default TicTacToe