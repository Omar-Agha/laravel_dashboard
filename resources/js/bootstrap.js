import axios from 'axios';
import { GetAppLanguage } from './UseCases/AppLocalizatoinUsecase';
window.axios = axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.axios.defaults.headers.common['X-Locale'] = GetAppLanguage();
