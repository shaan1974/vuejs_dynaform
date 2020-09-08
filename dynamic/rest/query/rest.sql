	SELECT 
		_users.id as UID,
		_users.name as firstname,
		_users.nickname as lastname,
		_users.age as age,
		DATE_FORMAT(_users.birthdate,'%d-%m-%Y') as birthdate,
		_groups.name as gname,
		"" as btn
	FROM
		_users
	
	Inner Join _groups ON _users._groups_id = _groups.id 

	WHERE %FILTERS% 