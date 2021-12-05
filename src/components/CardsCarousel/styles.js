import  { Dimensions, StyleSheet } from 'react-native'

const { width, height } = Dimensions.get('window')
const styles = StyleSheet.create({
          carouselContainer: {
                    marginVertical: 10
          },
          carousel: {
                    marginVertical: 10,
          },
          category: {
                    width: 150,
                    flexDirection: 'row',
                    alignItems: 'center',
                    alignContent: 'center',
                    paddingHorizontal: 15,
                    paddingVertical: 5,
                    borderWidth: 1,
                    borderColor: '#ddd',
                    borderRadius: 10,
          },
          selectedCategory: {
                    fontSize: 13,
                    color: '#000',
                    opacity: 0.7
          },
          slide: {
                    width: width - 60,
                    height: 200,
          },
          card: {
                    borderRadius: 30,
                    padding: 20,
                    height: '100%',
                    width: '100%',
          },
          cardHeader: {
                    flexDirection: 'row',
                    justifyContent: 'space-between'
          },
          cardCode: {
                    width: 60,
                    height: 40,
                    borderRadius: 10,
                    backgroundColor: '#ffd100',
                    flexDirection: 'row'
          },
          line1Container: {
                    width: '30%',
                    height: '100%',
                    flexDirection: 'row',
                    justifyContent: 'flex-end'
          },
          line1: {
                    backgroundColor: '#ff9500',
                    width: 8,
                    height: '100%',
          },
          line23Container: {
                    width: '70%',
                    height: '100%',
                    justifyContent: 'center'
          },
          line2: {
                    backgroundColor: '#ff9500',
                    width: '100%',
                    height: 8,
                    marginBottom: 5
          },
          line3: {
                    backgroundColor: '#ff9500',
                    width: '100%',
                    height: 8,
                    marginTop: 5
          },
          dateText: {
                    color: '#fff',
                    fontSize: 15,
                    fontWeight: 'bold'
          },
          cardAmounts: {
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingVertical: 10
          },
          mainAmount: {
                    fontSize: 20,
                    color: '#fff',
                    fontWeight: 'bold'
          },
          availableAmount: {
                    fontSize: 15,
                    color: '#fff',
                    opacity: 0.7,
                    fontWeight: 'bold'
          },
          cardFooter: {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    alignContent: 'center'
          },
          benefitAmount: {

          },
          benefitAmountText: {
                    fontWeight: 'bold',
                    color: '#fff'
          },
          monthDescs: {
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 1,
                    borderColor: '#ddd',
                    paddingVertical: 1,
                    paddingHorizontal: 10,
                    borderRadius: 5
          },
          monthDesc: {
                    flexDirection: 'row',
                    alignContent: 'center',
                    alignItems: 'center'
          },
          descTitle: {

          },
          descTitleText: {
                    color: '#fff',
                    fontSize: 10
          },
          descCount: {
                    width: 15,
                    height: 15,
                    borderRadius: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignContent: 'center',
                    borderColor: '#fff',
                    borderWidth: 1,
                    marginLeft: 5
          },
          descCountText: {
                    marginTop: -2,
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: 9
          }
})
export default styles