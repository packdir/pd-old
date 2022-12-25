
/**
 * 移除字符串头尾的斜杠。
 * @param str Remove the slash at the beginning and end of the string
 * @returns 
 */
export const trimSlash = (str: string): string => {
    return str.replace(/(^\/+|\/+$)/g, '')
}

