
export type UserProfile = {
    userName: string
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    role: string;
    status: number;
}


export type CommonTypeState = {
    toggle: boolean
    profile: UserProfile | null
    isAuthCheck: boolean
    sidebarToggleClose: boolean,
    positionAdminTab: string
}