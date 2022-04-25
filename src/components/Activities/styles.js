import { StyleSheet } from "react-native";

export const ActivitiesStyles = StyleSheet.create({
          transationsContainer: {
                    paddingHorizontal: 20
          },
          transanctionHeader: {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    alignContent: 'center',
                    marginBottom: 20
          },
          transationsTitle: {
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: '#000',
                    opacity: 0.6
          },
          transanctionDate: {
                    color: '#000',
                    opacity: 0.5,
                    fontSize: 13,
                    fontWeight: 'bold',
                    marginTop: 5
          }
})

export const ActivityStyles = StyleSheet.create({
          transanctionHeader: {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    alignContent: 'center',
                    marginBottom: 20
          },
          transationsTitle: {
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: '#000',
                    opacity: 0.6
          },
          transanctionDate: {
                    color: '#000',
                    opacity: 0.5,
                    fontSize: 13,
                    fontWeight: 'bold',
                    marginTop: 5
          },
          transanction: {
                    backgroundColor: '#f2f6f7',
                    borderRadius: 10,
                    padding: 15,
                    marginVertical: 10,
                    overflow: 'hidden'
          },
          transanctionMain: {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    alignContent: 'center',
                    width: '100%'
          },
          transanctionIcon: {
                    width: 50,
                    height: 50,
                    alignItems: 'center',
                    alignContent: 'center',
                    justifyContent: 'center',
                    borderRadius: 50,
                    backgroundColor: '#ebeded'
          },
          transanctionRight: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    alignContent: 'center',
          },
          transanctionMiddle: {
                    marginLeft: 15,
          },
          transationTitle: {
                    fontSize: 14,
                    color: '#000',
                    opacity: 0.7,
                    fontWeight: 'bold'
          },
          transationDay: {
                    fontSize: 13,
                    color: '#000',
                    opacity: 0.5,
          },
          transanctionAmount: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    alignContent: 'center',
          },
          amountSign: {
                    color: 'red',
                    fontWeight: 'bold'
          },
          amount: {
                    fontWeight: 'bold',
                    color: '#000'
          },
          body: {
                    color: '#000',
                    opacity: 0.7
          }
})
export const ActivitiesCategoriesStyles = StyleSheet.create({
          
          action: {
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignContent: 'center'
          },
          quickActions: {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 20
          },
          actionIcon: {
                    borderRadius: 20,
                    padding: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignContent: 'center'
          },
          actionTitle: {
                    marginTop: 5,
                    color: '#000',
                    opacity: 0.6,
                    fontWeight: 'bold'
          },
          selectedCheck: {
                    width: 20,
                    height: 20,
                    backgroundColor: 'red',
                    borderRadius: 100,
                    position: 'absolute',
                    top: -10,
                    right: 0,
                    padding: 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignContent: 'center'
          }
})