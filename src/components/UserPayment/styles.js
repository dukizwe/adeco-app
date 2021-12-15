import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
          user: {
                    backgroundColor: '#f2f6f7',
                    borderRadius: 10,
                    padding: 15,
                    marginVertical: 10,
                    flexDirection: 'row',
                    alignContent: 'center',
                    alignItems: 'center'
          },
          userImage: {
                    width: 50,
                    height: 50,
                    borderRadius: 50
          },
          userInfo: {
                    marginLeft: 20,
                    flex: 1
          },
          infoTop: {
                    flexDirection: 'row',
                    alignContent: 'center',
                    alignItems: 'center',
                    justifyContent: 'space-between',
          },
          dotIndicator: {
                    flexDirection: 'row',
                    alignContent: 'center',
                    alignItems: 'center',
                    justifyContent: 'space-between',
          },
          selectedCheck: {
                    width: 20,
                    height: 20,
                    backgroundColor: 'red',
                    borderRadius: 100,
                    padding: 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignContent: 'center'
          },
          userNames: {
                    fontWeight: 'bold',
                    color: '#000',
                    fontSize: 16,
                    opacity: 0.8,
                    marginBottom: 5
          },
          userActions: {
                    flexDirection: 'row',
                    alignContent: 'center',
                    alignItems: 'center',
                    justifyContent: 'space-between',
          },
          actionButton: {
                    flex: 1,
                    alignContent: 'center',
                    alignItems: 'center',
                    borderRadius: 5,
                    paddingHorizontal: 5
          },
          actionTitle: {
                    color: '#fff',
                    fontWeight: 'bold',
                    opacity: 0.8,
          },
          separator: {
                    height: 1,
                    width: '100%',
                    backgroundColor: '#fff',
                    opacity: 0.5
          },
          actionAmount: {
                    color: '#fff',
                    fontWeight: 'bold',
          }
})

export default styles