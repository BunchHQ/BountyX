package com.bunchhq.bountyx.ui.composables

import android.content.res.Configuration
import android.os.Build
import androidx.annotation.RequiresApi
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.outlined.LocationOn
import androidx.compose.material3.Card
import androidx.compose.material3.Icon
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.bunchhq.bountyx.data.Bounty
import com.bunchhq.bountyx.data.dummyBounty

@Composable
fun BountyItem(bounty: Bounty, modifier: Modifier = Modifier) {
    Card(
        modifier = modifier
            .fillMaxWidth()
            .height(84.dp)
    ) {
        Row(
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically,
            modifier = Modifier
                .fillMaxSize()
                .padding(12.dp)
        ) {
            Text("\uD83D\uDCDA", fontSize = 36.sp, modifier = Modifier.fillMaxWidth(0.12f))
            Column(
                horizontalAlignment = Alignment.Start,
                verticalArrangement = Arrangement.SpaceBetween,
                modifier = Modifier
                    .fillMaxWidth(0.70f)
                    .fillMaxHeight()
            ) {
                Row {
                    Text(bounty.details, fontWeight = FontWeight.Bold, fontSize = 24.sp)
                    Text(" x1", color = Color.Gray, fontSize = 24.sp)
                }

                Row(
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Icon(
                        Icons.Outlined.LocationOn,
                        contentDescription = null,
                        tint = Color.Gray
                    )
                    Text("From Deoghar", color = Color.Gray, fontSize = 14.sp)
                }
            }
            Column(
                horizontalAlignment = Alignment.Start,
                verticalArrangement = Arrangement.SpaceAround,
                modifier = Modifier.fillMaxHeight()
            ) {
                Text("Total Payout", fontWeight = FontWeight.SemiBold, fontSize = 12.sp)
                Text("$${bounty.reward}", fontWeight = FontWeight.Black, fontSize = 32.sp)
            }
        }
    }
}

@RequiresApi(Build.VERSION_CODES.UPSIDE_DOWN_CAKE)
@Preview
@Composable
fun BountyItemPreview() {
    BountyItem(dummyBounty())
}

@RequiresApi(Build.VERSION_CODES.UPSIDE_DOWN_CAKE)
@Preview(
    uiMode = Configuration.UI_MODE_NIGHT_YES or Configuration.UI_MODE_TYPE_NORMAL
)
@Composable
fun BountyItemDarkPreview() {
    BountyItem(dummyBounty())
}