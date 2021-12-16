import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
          quickActions: {
                    backgroundColor: '#f2f6f7',
                    borderRadius: 5,
                    position: 'absolute',
                    bottom: 0,
                    marginHorizontal: 20,
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignContent: 'center',
                    alignItems: 'center',
                    overflow: 'hidden'
          },
          exitButton: {
                    width: 40,
                    height: 40,
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignItems: 'center'
          },
          actions: {
                    flexDirection: 'row',
                    flex: 1,
          },
          quickActionButton: {
                    height: 40,
                    flex: 1,
                    margin: 2,
                    borderRadius: 5,
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignItems: 'center'
          },
          selectAllCircle: {
                    width: 40,
                    height: 40,
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignItems: 'center'
          },
          circle: {
                    width: 25,
                    height: 25,
                    borderRadius: 50,
                    borderColor: '#777',
                    borderWidth: 1,
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignItems: 'center'
          },
          selectedCount: {
                    fontSize: 13,
                    color: '#000',
                    opacity: 0.6,
                    fontWeight: 'bold'
          },
          actionButtonText: {
                    color: '#fff',
                    fontWeight: 'bold',
                    opacity: 0.8,
          }
})

export default styles