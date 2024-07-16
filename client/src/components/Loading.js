import React from 'react'

export default function Loading() {
  return (
    <>
    <div
            style={{
              width: "100%",
              height: "500px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div class="spinner-border" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
    </>
  )
}
