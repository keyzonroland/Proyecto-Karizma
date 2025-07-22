# Flujo de Trabajo Git - Proyecto Karizma

## Configuración de Ramas

### Rama `master` (Producción)
- **Propósito**: Contiene el código que se refleja en la página web final
- **Estado**: Solo debe contener código estable y probado
- **Despliegue**: GitHub Pages despliega automáticamente desde esta rama

### Rama `desarrollo` (Development)
- **Propósito**: Rama para desarrollo y pruebas
- **Estado**: Aquí puedes hacer todos los cambios y experimentos
- **Función**: No afecta la página web en producción

## Comandos Útiles

### Para trabajar en desarrollo:
```bash
# Cambiar a la rama de desarrollo
git checkout desarrollo

# Hacer cambios y confirmarlos
git add .
git commit -m "Descripción de los cambios"

# Subir cambios a GitHub
git push origin desarrollo
```

### Para aplicar cambios a producción:
```bash
# Cambiar a master
git checkout master

# Fusionar los cambios de desarrollo
git merge desarrollo

# Subir a producción (esto actualiza la web)
git push origin master
```

### Para crear nuevas ramas de características:
```bash
# Crear rama para una característica específica
git checkout -b feature/nueva-caracteristica desarrollo

# Trabajar en la característica...
git add .
git commit -m "Implementar nueva característica"

# Subir la rama
git push origin feature/nueva-caracteristica

# Fusionar de vuelta a desarrollo cuando esté lista
git checkout desarrollo
git merge feature/nueva-caracteristica
```

## Estado Actual

- ✅ Rama `master`: Contiene la versión actual de producción
- ✅ Rama `desarrollo`: Creada y lista para desarrollo
- ✅ Repositorio configurado en GitHub: `keyzonroland/Proyecto-Karizma`

## Recomendaciones

1. **Siempre desarrolla en la rama `desarrollo`** o en ramas de características
2. **Prueba los cambios** antes de fusionar a `master`
3. **Usa commits descriptivos** para mantener un historial claro
4. **Haz push regular** a la rama de desarrollo para respaldar tu trabajo
5. **Solo fusiona a master** cuando los cambios estén listos para producción

## Protección de la Página Web

La página web en GitHub Pages solo se actualiza cuando haces push a `master`. 
Todos los cambios en la rama `desarrollo` no afectarán la página web final.
