import { graphqlClient } from '@/clients/api'
import { toast } from '@/components/ui/use-toast';
import { CreateUser } from '@/gql/graphql';
import { createUserMutation } from '@/graphql/mutation/user';
import { getCurrentUserQuery, getUserByNameQuery } from '@/graphql/query/user'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useCurrentUser = () => {
    const query = useQuery({
        queryKey: ["current-user"],
        queryFn: () => graphqlClient.request(getCurrentUserQuery)
    });

    return { ...query, user: query.data?.getCurrentUser };

}
// export const useLoginUser = () => {
//     const query = useQuery({
//         queryKey: ["current-user"],
//         queryFn: () => graphqlClient.request(getLoginUserQuery)
//     });

//     return { ...query, user: query.data?. };

// }

// export const useGetUserbyName = () => {
//     const query = useQuery({
//         queryKey: ["get-user"],
//         queryFn: () => graphqlClient.request(getUserByNameQuery)
//     });

//     return { ...query, user: query.data?.getUserByName };

// }


export const useCreateUser = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (payload: CreateUser) => graphqlClient.request(createUserMutation, { payload }),
        onSuccess: async (data) => {
            window.localStorage.setItem('twitter-token', data?.createUser as string);
            await queryClient.invalidateQueries({ queryKey: ['current-user'] })
            toast({
                title: "User Created Successfully",
                description: "Now do try do login"
            });
            // redirect('/home')
        },
        onError: async (error) => {
            toast({
                variant: "destructive", title: error.message.split(":")[0],
                description: "There was a problem with your request.",
            });
        }
    });

    return mutation;
}