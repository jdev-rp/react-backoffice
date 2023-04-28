import users from "@/pages/users";

interface User {
    userId: string
    password: string
}

export function getUsers() {
    const usersString: string = localStorage.getItem('users');
    return usersString ? JSON.parse(usersString) : [];
}

export function push(user: User) :void {
    const users = getUsers();
    users.push(user)
    localStorage.setItem('users', JSON.stringify(users));
}

export function existByUserId(userId: string) : boolean {
    const users = getUsers();
    return users.findIndex(user => user.userId === userId) >= 0;
}

export function remove(userId: string) : void {
    const users = getUsers();
}