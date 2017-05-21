import hashlib

def create_token(salt):
	return hashlib.md5(salt.encode()).hexdigest()


