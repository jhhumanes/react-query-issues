import axios from 'axios';

export const githubApi = axios.create({
    baseURL: 'https://api.github.com/repos/facebook/react',
    headers: {
        Authorization: 'Bearer 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', // fine-grained personal access tokens
    },
});
