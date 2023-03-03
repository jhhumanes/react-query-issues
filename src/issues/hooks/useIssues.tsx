import { useState, useEffect } from "react";
import { useQuery } from '@tanstack/react-query';
import { githubApi } from "../../api/githubApi";
import { Issue, State } from "../interfaces";
import { sleep } from '../../helpers/sleep';

interface Props {
    state?: State;
    labels: string[];
    page?: number;
}

const getIssues = async ({ labels, state, page = 1 }: Props): Promise<Issue[]> => {
    await sleep(2);

    const params = new URLSearchParams();
    if (state) {
        params.append('state', state);
    }
    if (labels.length > 0) {
        const labelString = labels.join(',');
        params.append('labels', labelString);
    }
    params.append('page', page.toString());
    params.append('per_page', '5');

    const { data } = await githubApi<Issue[]>('/issues', { params });
    return data;
}

export const useIssues = ({ state, labels }: Props) => {
    const [page, setPage] = useState(1);

    useEffect(() => {
      setPage(1);
    }, [state, labels])

    const issuesQuery = useQuery(
        ['issues', { state, labels, page }], // un objeto como parte de la clave de la caché sin que importe el orden de los datos del objeto
        () => getIssues({ labels, state, page })
        // {
        //     onSuccess(data) {
                
        //     },
        //     onError(err) {
                
        //     },
        // }
    );

    const nextPage = () => {
        if (issuesQuery.data?.length === 0){
            return;
        }
        setPage(page + 1);
    }

    const prevPage = () => {
        if (page > 1){
            setPage(page - 1);
        }
    }

    return { 
        // Properties
        issuesQuery,

        // Getters
        page: issuesQuery.isFetching ? 'Cargando...' : page,

        // Methods
        nextPage,
        prevPage,
    };
}
