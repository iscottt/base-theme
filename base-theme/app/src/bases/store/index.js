import { createPinia } from 'pinia'
import useAppStore from './app'

const pinia = createPinia()
export { useAppStore }
export default pinia
