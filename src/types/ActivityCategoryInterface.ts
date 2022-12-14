export interface ActivityCategoryInterface {
          _id: string,
          name: string,
          type: 'in' | 'out',
          iconType?: "Ionicons" | "MaterialIcons",
          iconName?: string
}