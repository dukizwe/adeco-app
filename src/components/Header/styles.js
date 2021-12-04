import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
          header: {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    alignContent: 'center',
                    paddingTop: 45,
                    paddingHorizontal: 30,
                    paddingBottom: 20,
                    backgroundColor: '#fff'
          },
          headerRight: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    alignContent: 'center',
                    flex: 1
          },
          userImageContainer: {
                    width: 50,
                    height: 50,
          },
          userImage: {
                    width: '100%',
                    height: '100%',
                    borderRadius: 50
          },
          nameRole: {
                    marginLeft: 10
          },
          name: {
                    fontSize: 16,
                    fontWeight: 'bold'
          },
          role: {
                    fontSize: 13,
                    color: '#000',
                    opacity: 0.6
          },
          badge: {
                    width: 5,
                    height: 5,
                    borderRadius: 100,
                    backgroundColor: 'red',
                    position: 'absolute',
                    top: -3,
                    left: 20
          }
})

export default styles