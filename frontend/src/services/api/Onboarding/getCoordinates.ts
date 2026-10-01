const getCoordinates = (): Promise<GeolocationPosition> => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve(position)
      },
      (error) => {
        reject(error)
      }
    )
  })
}

export default getCoordinates