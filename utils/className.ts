import { isArray, isObject, isString } from '@/utils/is'

type ClassNamesArg = string | string[] | { [key: string]: any } | undefined | null | boolean

export function cs(...args: ClassNamesArg[]): string {
  const length = args.length
  let classNames: string[] = []
  for (let i = 0; i < length; i++) {
    const v = args[i]
    if (!v) {
      continue
    }
    if (isString(v)) {
      classNames.push(...v.split(' '))
    } else if (isArray(v)) {
      classNames = classNames.concat(v)
    } else if (isObject(v)) {
      Object.keys(v).forEach((k) => {
        if (v[k]) {
          classNames.push(k)
        }
      })
    } else {
      console.warn(true, 'arguments must be one of string/array/object.')
    }
  }
  return [...new Set(classNames)].join(' ')
}
