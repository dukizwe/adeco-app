/**
 * consomer une api avec les options par défaut
 * @param {string} url - le lien à appeler
 * @param {object} options - autres options comme les headers et le body
 * @returns {Promise}
 */
 export default async function fetchApi (url, options = {}) {
          // const user = JSON.parse(localStorage.getItem('user'))
          const user = null
          if (user) options = { ...options, headers: { ...options.headers, authorization: `bearer ${user.token}` } }
          const response = await fetch(url, {
                    ...options
          })
          if (response.ok) {
                    return response.json()
          } else {
                    throw await response.json()
          }
}