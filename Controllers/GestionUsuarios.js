


class ServicioUsuarios {

    constructor(DB) {
        this.DB = DB;
    }

    


    async addUsuarios(Email ,Cedula,Clave) {
        try {

          
           
            const Disponible="SI";

            const sql = "INSERT INTO Usuarios(Cedula,Email,Clave,Disponible) VALUES (?,?, ?,?)";
    
            await this.DB.Open(sql, [Email ,Cedula,Clave,Disponible]);
    
            return 'Guardado Exitosamente';
        } catch (err) {
            console.error(err);
            return 'Guardado errado';
        }
    }
    

    async getUsuarios() {
        try {
            const sql = "select * from usuarios Where Disponible='SI'";
            let result = await this.DB.Open(sql, []);
    
            if (result && result.length > 0) {
                
                return result.map(propiedad => ({
                    "Email": propiedad.email,
                    "Clave": propiedad.clave,

                }));
            } else {
                
                return [];
            }
        } catch (err) {
            
            console.error(err);
            return 'Error de consulta';
        }
    }
    
    async getUsuarioEspecifico(Cedula, Clave) {
        try {
            const sql = "SELECT * FROM usuarios WHERE Cedula = ? and Clave = ?";
            let result = await this.DB.Open(sql, [Cedula, Clave]);
    
            if (result && result.length > 0) {
                return {
        
                    "Email": result[0].email,
                    "Clave": result[0].clave,
          
                };
            } else {
                return null; // No se encontraron registros
            }
        } catch (err) {
            console.error(err);
            return 'Error de consulta';
        }
    }


  


}

module.exports = ServicioUsuarios;