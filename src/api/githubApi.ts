import axios from 'axios';

export const githubApi = axios.create({
    baseURL: 'https://api.github.com/repos/facebook/react',
    headers: {
        Authorization: 'Bearer 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', // fine-grained personal access tokens
    },
});
