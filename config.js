export const BD_HOST = process.env.BD_HOST || 'localhost';
export const BD_USER = process.env.BD_USER || 'root';
export const BD_PASSWORD = process.env.BD_PASSWORD || 'senha1234';
export const BD_NAME = process.env.BD_NAME || 'animecentral';
export const BD_PORT = process.env.BD_PORT || 3306;
export const BD_URL = `mysql://${{ BD_USER }}:${{ BD_PASSWORD }}@${{ BD_HOST }}:${{ BD_PORT }}/${{ BD_NAME }}`