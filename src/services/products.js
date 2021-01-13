import { http } from './config'

export default	{

	save:(product)=>{
		return http.post('user',product);
  },
	list:()=>{
		return http.get('user')
  },
}