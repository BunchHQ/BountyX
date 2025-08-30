package com.bunchhq.bountyx.ui.navigation

import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.padding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.outlined.Home
import androidx.compose.material.icons.outlined.Info
import androidx.compose.material.icons.outlined.Settings
import androidx.compose.material3.NavigationBar
import androidx.compose.material3.NavigationBarDefaults
import androidx.compose.material3.NavigationBarItem
import androidx.compose.material3.NavigationBarItemDefaults
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.ColorFilter
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.unit.dp
import androidx.navigation.NavController
import androidx.navigation.NavGraph.Companion.findStartDestination
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.currentBackStackEntryAsState
import com.bunchhq.bountyx.ui.screens.HomeScreen

@Composable
fun BountyXNavBar(navController: NavController, modifier: Modifier = Modifier) {
    NavigationBar(
        windowInsets = NavigationBarDefaults.windowInsets, modifier = modifier
    ) {
        val screens = listOf(
            BottomNavItem.HomeScreen, BottomNavItem.AboutScreen, BottomNavItem.SettingsScreen
        )

        val navBackStackEntry by navController.currentBackStackEntryAsState()
        val currentRoute = navBackStackEntry?.destination?.route

        screens.forEach { screen ->
            NavigationBarItem(
                label = {
                    Text(text = screen.label)
                },
                icon = {
                    Image(
                        screen.icon,
                        contentDescription = "",
                        colorFilter = ColorFilter.tint(Color.White)
                    )
                },
                selected = currentRoute == screen.route,
                onClick = {
                    navController.navigate(screen.route) {
                        popUpTo(navController.graph.findStartDestination().id) {
                            saveState = true
                        }
                        launchSingleTop = true
                        restoreState = true
                    }
                },
                colors = NavigationBarItemDefaults.colors(),
            )
        }
    }
}

@Composable
fun NavigationGraph(navController: NavHostController) {
    NavHost(navController, startDestination = BottomNavItem.HomeScreen.route) {
        composable(BottomNavItem.HomeScreen.route) {
            HomeScreen()
        }
        composable(BottomNavItem.AboutScreen.route) {
            Text("About")
        }
        composable(BottomNavItem.SettingsScreen.route) {
            Text("Settings")
        }
    }
}

sealed class BottomNavItem(val route: String, val icon: ImageVector, val label: String) {
    object HomeScreen : BottomNavItem(
        "home", Icons.Outlined.Home, "Home"
    )

    object AboutScreen : BottomNavItem("about", Icons.Outlined.Info, "About")
    object SettingsScreen : BottomNavItem("settings", Icons.Outlined.Settings, "Settings")
}