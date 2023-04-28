import boolean from "async-validator/dist-types/validator/boolean";

export const userIdRegex: RegExp = /^[a-z]{5,15}$/;
export const userIdRegexMessage :string = '아이디는 영문 5~15자까지만 가능합니다'

export const passwordRegex: RegExp = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
export const passwordRegexMessage :string = '패스워드는 영문, 숫자, 특수문자 8자이상 가능합니다'

