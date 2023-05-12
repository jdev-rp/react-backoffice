interface User {
    readonly userId: string
    password: string
    passwordConfirm?: string
    nickname?: string
    birthday?: string
}

export function getUsers() {
    const usersString: string = localStorage.getItem('users');
    return usersString ? JSON.parse(usersString) : [];
}

export function getUser(userId: string): User {
    const usersString: string = localStorage.getItem('users');
    if(!usersString) return null;

    return JSON.parse(usersString).filter((obj) => obj.userId === userId)[0];
}

export function pushByUser(user: User) :void {
    const users = getUsers();
    users.push(user)
    localStorage.setItem('users', JSON.stringify(users));
}

export function updateUser(user: User): void {
    removeByUserId(user.userId);
    pushByUser(user);
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
    const users = getUsers().filter(obj => obj.userId !== userId);
    localStorage.setItem('users', JSON.stringify(users))
}