package com.bunchhq.bountyx.ui.screens

import android.os.Build
import androidx.annotation.RequiresApi
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.lazy.rememberLazyListState
import androidx.compose.material3.BottomSheetScaffold
import androidx.compose.material3.Button
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.SheetValue
import androidx.compose.material3.Text
import androidx.compose.material3.rememberBottomSheetScaffoldState
import androidx.compose.material3.rememberStandardBottomSheetState
import androidx.compose.runtime.Composable
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.bunchhq.bountyx.data.dummyBounties
import com.bunchhq.bountyx.ui.composables.BountyItem

@RequiresApi(Build.VERSION_CODES.UPSIDE_DOWN_CAKE)
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun HomeScreen() {
    val scope = rememberCoroutineScope()
    //    onClick = { scope.launch { scaffoldState.bottomSheetState.expand() } }

    val sheetState = rememberStandardBottomSheetState(
        SheetValue.PartiallyExpanded,
    )
    val scaffoldState = rememberBottomSheetScaffoldState(sheetState)

    val nearbyBounties = dummyBounties()
    val listState = rememberLazyListState()

    BottomSheetScaffold(
        scaffoldState = scaffoldState, sheetPeekHeight = 256.dp, sheetContent = {
            Column(Modifier.fillMaxSize(), horizontalAlignment = Alignment.CenterHorizontally) {
                Box(
                    Modifier
                        .fillMaxWidth()
                        .padding(12.dp)
                        .height(48.dp),
                    contentAlignment = Alignment.TopStart
                ) {
                    Text("Nearby Bounties", fontSize = 24.sp, fontWeight = FontWeight.SemiBold)
                }

                LazyColumn(
                    state = listState,
                    contentPadding = PaddingValues(horizontal = 8.dp, vertical = 4.dp),
                    verticalArrangement = Arrangement.spacedBy(8.dp),
                    modifier = Modifier.fillMaxWidth()
                ) {
                    items(nearbyBounties) { bounty ->
                        BountyItem(bounty)
                    }
                }
            }

        }) { paddingValues ->
        Column(
            verticalArrangement = Arrangement.Center,
            horizontalAlignment = Alignment.CenterHorizontally,
            modifier = Modifier
                .fillMaxSize()
                .padding(paddingValues)
        ) {
            Button(onClick = {}) {
                Text("A nice Map right here")
            }
        }
    }
}

@RequiresApi(Build.VERSION_CODES.UPSIDE_DOWN_CAKE)
@Preview
@Composable
fun HomeScreenPreview() {
    HomeScreen()
}