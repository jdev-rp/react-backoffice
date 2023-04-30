interface User {
    readonly userId: string
    password: string
    nickname?: string
    birthday?: string
}

export function getUsers() {
    const usersString: string = localStorage.getItem('users');
    return usersString ? JSON.parse(usersString) : [];
}

export function pushByUser(user: User) :void {
    const users = getUsers();
    users.push(user)
    localStorage.setItem('users', JSON.stringify(users));
}

export function existByUserId(userId: string) : boolean {
    const users = getUsers();
    return users.findIndex(user => user.userId === userId) >= 0;
}

export function existByUserIdAndPassword(user: User) : boolean {
    const users = getUsers();
    return users.findIndex(userStorage => (userStorage.userId === user.userId
        && userStorage.password === user.password)) >= 0;
}

export function existNotByUserIdAndPassword(user: User) : boolean {
    return !existByUserIdAndPassword(user);
}

export function removeByUserId(userId: string) : void {
    const users = getUsers();
    localStorage.setItem('users', JSON.stringify(users))
}