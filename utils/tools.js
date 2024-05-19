
//获取默认头像
export function giveAvatar(item){	
	return item.author_id[0]?.avatar_file?.url ??'../../static/images/user-default.jpg'
} 