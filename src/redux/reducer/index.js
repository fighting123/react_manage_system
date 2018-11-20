/**
 * Reducer 数据处理
 */
import {type} from './../action/index'
const initialState = {
  menuName: '首页'
}

export default (state = initialState,action) => {  // 固定格式
  switch (action.type) {
    case 'SWITCH_MENU':
      return {
        ...state, // 保留原有状态，添加新状态
        menuName: action.menuName
      };
      break;
    default:
      return {
        ...state
      };
      break;
  }
}