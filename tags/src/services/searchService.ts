import axios from 'axios';
import { config } from '../config/config';

interface DatamuseWord {
    word: string,
    score: number,
}

export async function topNearestWords(word: string): Promise<string[]> {
    const { data } = await axios.get(`${config.datamuseApi}?sp=${word}&max=${config.maxWordDefault}`);
    return data.map((top: DatamuseWord) => top.word);
}