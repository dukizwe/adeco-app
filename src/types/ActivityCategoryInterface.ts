export interface ActivityCategoryInterface {
          id: number,
          name: string,
          type: 'in' | 'out',
          iconType?: "Ionicons" | "MaterialIcons",
          iconName?: string
}