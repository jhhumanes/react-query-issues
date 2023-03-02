import { FiInfo, FiMessageSquare, FiCheckCircle } from 'react-icons/fi';
import { Issue, State } from '../interfaces';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { getIssueComments, getIssueInfo } from '../hooks/useIssue';

interface Props {
    issue: Issue;
}

export const IssueItem: FC<Props> = ({ issue }) => {
    const navigate = useNavigate();

    const queryClient = useQueryClient();

    const prefetchData = () => {
        // Precarga de datos en la cache desde la red.
        queryClient.prefetchQuery(
            ["issue", issue.number],
            () => getIssueInfo(issue.number)
        );

        queryClient.prefetchQuery(
            ["issue", issue.number, 'comments'],
            () => getIssueComments(issue.number)
        );
    }

    const presetData = () => {
        // Precarga de datos en la cache desde los datos que ya se tienen.
        queryClient.setQueryData(
            ["issue", issue.number],
            issue,
            {
                updatedAt: new Date().getTime() + 100000, // fecha hasta que los datos se consideran frescos
            }
        );
    }

    return (
        <div 
            className="card mb-2 issue" 
            onClick={ () => navigate(`/issues/issue/${issue.number}`) }
            onMouseEnter={ presetData }
        >
            <div className="card-body d-flex align-items-center">
                {
                    issue.state === State.Open
                        ? <FiInfo size={30} color="red" />
                        : <FiCheckCircle size={30} color="green" />
                }

                <div className="d-flex flex-column flex-fill px-2">
                    <span>{ issue.title }</span>
                    <span className="issue-subinfo">#{ issue.number } opened 2 days ago by <span className='fw-bold'>{ issue.user.login }</span></span>
                </div>

                <div className='d-flex align-items-center'>
                    <img src={ issue.user.avatar_url } alt={ issue.user.login } className="avatar" />
                    <span className='px-2'>{ issue.comments }</span>
                    <FiMessageSquare />
                </div>

            </div>
        </div>
    )
}
