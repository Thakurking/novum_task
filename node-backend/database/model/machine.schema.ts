import * as mongoose from "mongoose";

export const machineSchema = new mongoose.Schema(
  {
    machine_id: {
      type: String,
      required: true,
    },
    services: [
      {
        compose_file: {
          type: String,
          required: true
        },
        compose_version: {
          type: String,
          required: true
        },
        service_list: [
          {
            service_name: {
              type: String,
              required: true
            },
            container_name: {
              type: String,
              required: true
            },
            image: {
              type: String,
              required: true
            },
            volumes: {
              type: Array,
            }
          }
        ]
      }
    ]
    // compose_details: [
    //   {
    //     version: {
    //       type: String,
    //       required: true,
    //     },
    //     services: {
    //       type: Array,
    //       required: true,
    //     },
    //     images: {
    //       type: Array,
    //       required: true,
    //     },
    //     file_name: {
    //       type: String,
    //       required: true,
    //     },
    //   },
    // ],
    // version: {
    //   type: String,
    //   required: true,
    // },
    // services: {
    //   type: Array,
    //   required: true,
    // },
    // images: {
    //   type: Array,
    //   required: true
    // }
  },
  {
    timestamps: true,
  }
);

// {
//   machine_id: 'string',
//   services: [
//     {
//       compose_file: 'compose file name',
//       version: 'string',
//       serviceList: [
//         {
//           service_name: 'string',
//           image_name: 'string',
//           container_name: 'string',
//           ports: 'string'
//         }
//       ]
//     }
//   ]
// }